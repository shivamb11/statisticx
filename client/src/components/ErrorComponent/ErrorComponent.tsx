import "./ErrorComponent.scss";

function ErrorComponent({ error }: { error: Error }) {
  return (
    <div className="error">
      <p>{error.message}😥</p>
      <p>Please wait..</p>
    </div>
  );
}

export default ErrorComponent;
