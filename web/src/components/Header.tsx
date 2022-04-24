export default function Header({ children }) {
  return (
    <div className="relative pt-16 pb-32 flex content-center items-center justify-center h-screen">
      <div className="bg-landing-background bg-cover bg-center absolute top-0 w-full h-full" />

      {children}
    </div>
   

  );
}
