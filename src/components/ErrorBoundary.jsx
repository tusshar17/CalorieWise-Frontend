
function ErrorFallBack({error, resetErrorBoundary}) {

    return (
        <div role="alert">
            <p>something went wrong</p>
            <br/>
            <p>{error.message}</p>
            <button onClick={resetErrorBoundary}>try again</button>
        </div>
    )

}


export default ErrorFallBack