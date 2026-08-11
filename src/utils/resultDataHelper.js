function clean(str) {
  if (typeof str !== 'string') return ''
  return str.replace(/\t/g, '').replace(/\r\n/g, '').replace(/\r/g, '').replace(/\n/g, '').trim() || ''
}

function cleanReg(reg) {
  return clean(reg).replace(/\s+/g, '')
}

function getPictureUrl(pictureField) {
  const fileName = clean(pictureField);
  if (!fileName || fileName === "no-photo.png") {
    return "/result/pics/no-photo.png";
  }
  return `/result/pics/${fileName}`;
}

function parseTables(parsed) {
  const tables = {}
  for (const entry of parsed) {
    if (entry.type === 'table' && entry.database === 'bustanas_drms' && entry.name) {
      tables[entry.name] = entry.data || []
    }
  }
  return tables
}

function searchResult(formData = {}, tablesOverride) {
  const tables = tablesOverride || {}
  const { students = [], branches = [], courses = [], grade = [] } = tables

  const regInput = cleanReg(formData.reg_id)
  if (!regInput) {
    throw new Error('Registration number is required')
  }

  const foundStudent = students.find(
    (s) => cleanReg(s.reg_id) === regInput
  )

  if (!foundStudent) {
    return { found: false, message: 'No student found with this Registration No' }
  }

  const studentRaw = foundStudent;
  console.log("Found Raw Student:", studentRaw);

  const fatherName = clean(studentRaw.f_name) || clean(studentRaw.father) || "-";
  const motherName = clean(studentRaw.m_name) || clean(studentRaw.mother) || "-";
  const pictureName = clean(studentRaw.picture) || "no-photo.png";

  const branch = branches.find((b) => b.branch_id === foundStudent.branch_id) || {}
  const course = courses.find((c) => c.crs_id === foundStudent.crs_id) || {}
  const courseName = clean(course.name)
  const courseFullForm = clean(course.full_form)
  const course_code = courseName
  const course = courseFullForm ? `${courseName} - ${courseFullForm}` : courseName

  const restrictedKeys = new Set(['email', 'phone', 'dob', 'sex', 'f_name', 'm_name', 'address', 'username', 'password', 'role'])

  const publicStudentFields = {
    id: foundStudent.id,
    name: clean(foundStudent.name),
    reg_id: cleanReg(foundStudent.reg_id),
    roll: clean(foundStudent.roll),
    picture: pictureName,
    picture_url: getPictureUrl(pictureName),
    father: fatherName,
    mother: motherName,
    branch_id: foundStudent.branch_id,
    crs_id: foundStudent.crs_id,
    course_code: course_code,
    course: course_full_form,
  }

  const cleanedStudent = {}
  for (const key of Object.keys(foundStudent)) {
    if (!restrictedKeys.has(key) && !(key === 'password' || key === 'username' || key === 'role')) {
      cleanedStudent[key] = publicStudentFields[key] !== undefined ? publicStudentFields[key] : clean(foundStudent[key])
    }
  }

  const studentGrades = grade.filter((g) => cleanReg(g.reg_id) === regInput)

  const results = studentGrades.map((g) => {
    const resultEntry = {
      g_id: g.g_id,
      reg_id: cleanReg(g.reg_id),
      crs_id: g.crs_id,
      exam: g.Exam || '',
      season: g.season || '',
    }

    resultEntry['1st'] = g['1st'] ? clean(g['1st']) : '-'
    resultEntry['2nd'] = g['2nd'] ? clean(g['2nd']) : '-'
    resultEntry['3rd'] = g['3rd'] ? clean(g['3rd']) : '-'

    const finalGrade = g.grade ? clean(g.grade) : g.result ? clean(g.result) : '-'
    resultEntry.grade = finalGrade

    if (g.result) {
      resultEntry.result = String(g.result).includes('Pass') ? 'Pass' : clean(g.result)
    } else {
      resultEntry.result = '-'
    }

    return resultEntry
  })

  const warnings = []

  if (
    formData.branch_id &&
    clean(formData.branch_id) !== '' &&
    String(formData.branch_id) !== String(foundStudent.branch_id)
  ) {
    warnings.push(`Branch mismatch: expected ${foundStudent.branch_id}, got ${formData.branch_id}`)
  }

  return {
    found: true,
    student: publicStudentFields,
    branch,
    course,
    course_code,
    results,
    warnings,
  }
}

let _tablesCache = null

function loadTables() {
  if (_tablesCache) return _tablesCache
  try {
    const fs = require('fs')
    const path = require('path')
    const dataFile = path.join(process.cwd(), 'src/data/result/student/student_info.json')
    const raw = fs.readFileSync(dataFile, 'utf8')
    const parsed = JSON.parse(raw)
    _tablesCache = parseTables(parsed)
  } catch {
    _tablesCache = {}
  }
  return _tablesCache
}

module.exports = {
  clean,
  cleanReg,
  getPictureUrl,
  parseTables,
  searchResult,
  loadTables,
}
