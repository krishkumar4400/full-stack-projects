import { useContext } from "react";


export const AppContext = useContext();

export const AppContextProvider = (props) => {
    const value = {}
    return (
        < AppContext.provider value={value}>
            {props.children}
        </AppContext.provider>
    )
}
