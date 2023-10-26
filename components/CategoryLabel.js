import Link from 'next/link'

function CategoryLabel({ children }) {
  let colours =
    'bg-green-600 bg-red-600 bg-yellow-600 bg-purple-600 bg-orange-600 bg-blue-600'
  const colorKey = {
    JavaScript: 'yellow',
    CSS: 'blue',
    Python: 'green',
    PHP: 'purple',
    Ruby: 'red',
    Golang: 'orange',
  }
  // console.log(colorKey[children])
  return (
    <div
      className={`px-2 py-1 bg-${colorKey[children]}-600 text-gray-100 font-bold rounded`}
    >
      <Link href={`/blog/category/${children.toLowerCase()}`}>{children}</Link>
    </div>
  )
}

export default CategoryLabel
