import Head from "next/head";
import AppLayout from "../components/AppLayout";
import { colors } from "../styles/theme";
import Button from "../components/Button";
import GitHub from "../components/Icons/GitHub";

export default function Home() {
  return (
    <>
      <Head>
        <title>devter 🐦</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <section>
          <img src="/devter-logo.png" alt="logo" />
          <h1>Devter</h1>
          <h2>Talk about development with developers 👩‍💻👨‍💻</h2>
          <div>
            <Button>
              <GitHub fill={"#fff"} width={24} height={24} />
              Login with Github
            </Button>
          </div>
        </section>
      </AppLayout>

      <style jsx>{`
        section {
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
        }

        div {
          margin-top: 16px;
        }

        img {
          width: 120px;
        }

        h1 {
          color: ${colors.primary};
          font-weight: 800;
          margin-bottom: 16px;
        }

        h2 {
          color: ${colors.secondary};
          font-size: 21px;
          margin: 0;
        }
      `}</style>
    </>
  );
}
