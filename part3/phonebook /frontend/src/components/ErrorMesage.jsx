const ErrorMesage = ({error, message}) => {
    if(!message) {
        return null
    }

    const errorStyling = {
        color: "red",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px"
    }
    const notificationStyling = {
        color: "green",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px"
    }

    return (
        <div style={error ? errorStyling : notificationStyling}>
            <p>{message}</p>
        </div>
    )
}

export default ErrorMesage