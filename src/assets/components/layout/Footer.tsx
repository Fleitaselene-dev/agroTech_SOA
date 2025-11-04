

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-neutral text-neutral-content p-4 flex flex-col sm:flex-row items-center justify-between">
      <div className="flex items-center gap-3 mb-4 sm:mb-0">
        <img src="/AgroPec.png" alt="AgroPec" height={80} width={100} />
        <p>Copyright © {year} - All rights reserved</p>
      </div>
    </footer>
  );
}
