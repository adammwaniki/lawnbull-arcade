
export default function Navbar() {
  return (
    <div className="flex bg-gray-200 text-lg lg:text-[3.5vh]">
      <aside>
        

        <div className="border-l flex-grow">
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
