

import { useContext } from "react";
import { UserContext } from "./UserContext";



const useUser = () => {

    const { random } = useContext(UserContext)

    if (!random) {
        throw new Error("Hsving Some Error ");
    }

}

export default useUser;