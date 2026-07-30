import BrandMark from "./BrandMark";
import { footer } from "./content";

export default function SiteFooter() {
  return (
    <footer className="flex justify-center px-[30px] pb-[72px] pt-[160px]">
      <div className="flex w-full max-w-[1200px] items-center justify-between gap-5 text-[16px] text-muted max-[767.98px]:flex-col max-[767.98px]:items-start">
        <BrandMark />
        <p>{footer.copyright}</p>
      </div>
    </footer>
  );
}
