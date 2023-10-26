export const sortByDate = (a, b) => {
  // console.log(Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date))
  return Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date)
}
