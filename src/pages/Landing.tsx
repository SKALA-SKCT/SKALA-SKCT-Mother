import SiteHeader from '../landing/SiteHeader';
import Hero from '../landing/Hero';
import LogoMarquee from '../landing/LogoMarquee';
import SolutionsSection from '../landing/SolutionsSection';
import GrowthSection from '../landing/GrowthSection';
import DataPlatformSection from '../landing/DataPlatformSection';
import StatsSection from '../landing/StatsSection';
import WorkflowSection from '../landing/WorkflowSection';
import OpportunitySection from '../landing/OpportunitySection';
import FaqSection from '../landing/FaqSection';
import BottomCta from '../landing/BottomCta';
import SiteFooter from '../landing/SiteFooter';
import ScrollReveal from '../landing/ScrollReveal';
import SmoothScroll from '../landing/SmoothScroll';
import DesktopOnly from '../landing/DesktopOnly';

export default function Landing() {
  return (
    <>
      <SmoothScroll />
      <ScrollReveal />
      <SiteHeader />
      <main>
        <Hero />
        <LogoMarquee />
        <SolutionsSection />
        <GrowthSection />
        <DataPlatformSection />
        <StatsSection />
        <WorkflowSection />
        <OpportunitySection />
        <FaqSection />
        <BottomCta />
      </main>
      <SiteFooter />
      <DesktopOnly />
    </>
  );
}
