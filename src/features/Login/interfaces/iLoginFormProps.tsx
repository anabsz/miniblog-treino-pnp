export default interface iLoginFormProps {
	onSuccess: () => void;
	onError: (message: string) => void | null;
}
