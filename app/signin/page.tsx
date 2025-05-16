import { createUserIfNotExists } from "@/app/signin/action";

export default async function DashboardPage() {
    await createUserIfNotExists(); // ⬅️ runs server-side

    return (
        <div>
            <h1>Welcome to the Dashboard!</h1>
        </div>
    );
}
