import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ThemeList from "@/components/ThemeList";
import ThemeForm from "@/components/ThemeForm";

export default function Themes() {
  return (
    <div className="bg-gray-300 dark:bg-gray-900">
      <Header/>
      <div className="h-[84vh]">
        <ThemeForm/>
        <ThemeList/>
      </div>
      <Footer/>
    </div>
  )
}
