function clean(str) {
  if (typeof str !== 'string') return ''
  return str.replace(/\t/g, '').replace(/\r\n/g, '').replace(/\r/g, '').replace(/\n/g, '').trim() || ''
}

function cleanReg(reg) {
  return clean(reg).replace(/\s+/g, '')
}

function getPictureUrl(pictureField) {
  const trimmed = clean(pictureField)
  if (!trimmed) {
    return '/result/pics/no-photo.png'
  }
  const sanitized = trimmed.replace(/[\\/]/g, '').replace(/\.\./g, '')
  if (/[^a-zA-Z0-9._\-]/.test(sanitized)) {
    return '/result/pics/no-photo.png'
  }
  return `/result/pics/${sanitized}`
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
  console.log("STEP 1 - Raw Student JSON Object:", studentRaw);

  const fatherName = studentRaw.f_name !== undefined && studentRaw.f_name !== null
    ? clean(studentRaw.f_name)
    : (studentRaw.father ? clean(studentRaw.father) : "-");

  const motherName = studentRaw.m_name !== undefined && studentRaw.m_name !== null
    ? clean(studentRaw.m_name)
    : (studentRaw.mother ? clean(studentRaw.mother) : "-");

  const picFileName = studentRaw.picture !== undefined && studentRaw.picture !== null
    ? clean(studentRaw.picture)
    : "no-photo.png";

  const branch = branches.find((b) => b.branch_id === foundStudent.branch_id) || {}
  const course = courses.find((c) => c.crs_id === foundStudent.crs_id) || {}
  const course_code = course.name || ''
  const course_full_form = clean(course.full_form)

  const student = {
    id: studentRaw.id,
    name: clean(studentRaw.name),
    reg_id: cleanReg(studentRaw.reg_id),
    roll: clean(studentRaw.roll),
    father: fatherName || "-",
    mother: motherName || "-",
    picture: picFileName,
    picture_url: getPictureUrl(picFileName),
    branch_id: clean(studentRaw.branch_id),
    crs_id: clean(studentRaw.crs_id),
    course_code: course_code,
    course_name: course_full_form,
  }

  console.log("STEP 2 - Final Returned Student Object:", student);

  const cleanedStudent = student;

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

  if (formData.roll && clean(formData.roll) !== '' && clean(formData.roll) !== cleanedStudent.roll) {
    warnings.push(`Roll number mismatch: expected ${cleanedStudent.roll}, got ${clean(formData.roll)}`)
  }

  if (
    formData.branch_id &&
    clean(formData.branch_id) !== '' &&
    String(formData.branch_id) !== String(foundStudent.branch_id)
  ) {
    warnings.push(`Branch mismatch: expected ${foundStudent.branch_id}, got ${formData.branch_id}`)
  }

  return {
    found: true,
    student: cleanedStudent,
    branch,
    course,
    course_code,
    results,
    warnings,
  }
}

module.exports = {
  clean,
  cleanReg,
  getPictureUrl,
  parseTables,
  searchResult,
}
