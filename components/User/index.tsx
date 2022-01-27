import { useStore } from "../../lib/store";
import shallow from "zustand/shallow";

const User = () => {
  const { token } = useStore(
    (store) => ({
      token: store.token
    }),
    shallow
  );
  return (
    <>
        <label>
            {token}
        </label>
        <style jsx>
            {`
            label {
                font-size: 1.17em;
            }
            `}
        </style>
    </>
  )
}

export default User
