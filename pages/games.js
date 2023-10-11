import styles from "../styles/Home.module.css";
import BlogCard from "../components/BlogCard";
import ParseContent from "../components/ParseContent";
import DefaultHead from "../components/DefaultHead";

const Content = require("../components/Content");

export async function getStaticProps() {
  return Content.getStaticProps();
}

export default function Home({ posts, layoutCategories}) {

  var sortedPosts = ParseContent(posts, layoutCategories);

  return (
    <div className={styles.container}>
      <DefaultHead/>

      <main className={styles.main}>
        <iframe frameborder="0" scrolling="no" src="https://mczak.com/code/sudoku/suframe/" style="border:0px solid #eee; overflow:hidden; width:400px; height:500px;" width="400"></iframe>
      </main>

    </div>
  );

}

//created by CyclopPanda, cakGit (< THATS ME :D) and Thomas
