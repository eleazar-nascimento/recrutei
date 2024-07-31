import { LogoImage } from "@/assets/logo";

export function NavBar() {
  return (
    <div className="bg-card p-4 flex items-center justify-start w-full rounded-3xl gap-5">
      <LogoImage />
      <div className="font-semibold text-primary">Teste vaga front</div>
    </div>
  );
}
