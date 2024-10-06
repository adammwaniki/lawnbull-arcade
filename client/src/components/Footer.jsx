
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex justify-center flex-wrap space-x-6 md:flex-row text-center text-xs md:text-lg p-1 bg-gray-100 text-black left-0 bottom-0 w-full" style={{ position: 'fixed', }}>
      <div>
        &copy; {currentYear} Lawnbull Limited. All rights reserved.
      </div>
      <div>
        Contact us: +254-722-815-283 | kazibest@yahoo.com
      </div>
      <div>
        Location: Kenya, Nyeri, Kazi Building, along Kimathi Street
      </div>
    </footer>
  );
}
