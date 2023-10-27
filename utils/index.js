export const sortByDate = (a, b) => {
  // console.log(Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date))
  // return Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date)
  return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
}
