import { Button } from "../ui/button"

export default function Categories({ setCategory }) {
    return (
        <div className="flex gap-x-7">
            <Button variant="outline" onClick={() => setCategory("All")}>All</Button>
            <Button variant="outline" onClick={() => setCategory("Liked")}>Liked</Button>
        </div>
    )
}