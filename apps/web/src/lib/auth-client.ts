import { useEffect } from 'react'
import { createAuthClient } from 'better-auth/react'
import { anonymousClient } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
  plugins: [anonymousClient()],
})

// StrictMode などで effect が2回走っても、匿名ユーザーを二重に作らないようにする
let signingIn: Promise<unknown> | null = null

/** ログインしていなければ匿名ユーザーとしてログインする */
export function useAnonymousSignIn() {
  const { data, isPending } = authClient.useSession()
  useEffect(() => {
    if (isPending || data || signingIn) return
    signingIn = authClient.signIn.anonymous().finally(() => {
      signingIn = null
    })
  }, [data, isPending])
}
