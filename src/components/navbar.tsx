import Logo from "/src/logo.svg";

export function NavBar() {
  return (
    <div className="bg-card p-4 flex items-center justify-start w-full rounded-3xl gap-5">
      {/* <img src={Logo} alt="Logo da empresa Recrutei" width={56} /> */}
      <div className="font-semibold text-primary">Teste vaga front</div>
    </div>
  );
}
