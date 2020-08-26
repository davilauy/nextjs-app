import { useEffect } from "react"

import Head from "next/head"
import { useRouter } from "next/router"

import { loginWithGitHub, loginWithGoogle } from "firebase/client"
import useUser, { USER_STATES } from "hooks/useUser"

import AppLayout from "components/AppLayout"
import Button from "components/Button"
import GitHub from "components/Icons/GitHub"
import Google from "components/Icons/Google"
import Logo from "components/Icons/Logo"

import { colors } from "styles/theme"

export default function Home() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace("/home")
  }, [user])

  const handleLoginGitHub = () => {
    loginWithGitHub().catch((err) => {
      console.log(err)
    })
  }

  const handleLoginGoogle = () => {
    loginWithGoogle().catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
      <Head>
        <title>devter 🐦</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <section>
          <Logo width="100" />
          <h1>Devter</h1>
          <h2>
            Talk about development
            <br />
            with developers 👩‍💻👨‍💻
          </h2>

          <div>
            {user === USER_STATES.NOT_LOGGED && (
              <div>
                <Button onClick={handleLoginGitHub}>
                  <GitHub fill="#fff" width={24} height={24} />
                  Login with GitHub
                </Button>
                <Button onClick={handleLoginGoogle}>
                  <Google fill="#4285F4" width={24} height={24} />
                  Login with Google
                </Button>
              </div>
            )}
            {user === USER_STATES.NOT_KNOWN && (
              <img src="/spinner.gif" alt="Loading..." />
            )}
          </div>
        </section>
      </AppLayout>

      <style jsx>{`
        img {
          width: 120px;
        }
        div {
          margin-top: 16px;
        }
        div > :global(button) {
          margin: 10px;
        }
        section {
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
        }
        h1 {
          color: ${colors.primary};
          font-size: 32px;
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
  )
}
