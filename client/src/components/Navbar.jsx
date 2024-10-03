
export default function Navbar() {
  return (
    <div className="flex w-fit lg:h-fit p-2 bg-gray-200 text-lg lg:text-[3.5vh] lg:leading-tight">
      <aside>
        

        <div className="flex border-l flex-grow">
          <nav>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/marketing">Marketing</a>
              </li>
              <li>
                <a href="/login">Login</a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  )
}
