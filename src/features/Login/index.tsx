import LoginForm from "./forms/login";

export default function LoginPage() {
	return (
		<div className="container d-flex flex-col items-center justify-center min-h-screen">
			<div className="w-lg d-flex flex-col gap-2 px-4 py-8 bg-pure-0 shadow-xl">
				<h1>Login</h1>
				<LoginForm />
			</div>
		</div>
	);
}
