import Link from 'next/link'
import User from "../User";
import Login from "../Login";
import { useStore } from "../../lib/store";
import shallow from "zustand/shallow";

const Nav = () => {
  const { token } = useStore(
    (store) => ({
      token: store.token
    }),
    shallow
  );
  return (
    <div style={{display: 'flex', padding: '1rem 0', justifyContent: 'space-between'}}>
      <h3>CryptoTradingApp</h3>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/trading">
          <a>Trading</a>
        </Link>
        {token?.length > 0 ? <User/> : <Login/>}
        <style jsx>
          {`
            a {
              margin-right: 25px;
              line-height: 3em;
              text-decoration: none;
              color: black;
              font-size: 1.17em;
            }

            button {
              background-color: transparent;
              border: none;
              outline: none;
              font-size: 1.07em;
              cursor: pointer;
            }
          `}
        </style>
      </nav>
    </div>
  )
}

export default Nav
