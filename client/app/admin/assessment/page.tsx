export default function Assessment() {
    const path = encodeURIComponent("Hello world");
    const decode = decodeURIComponent(path);
    return (
        <div>assessment{path} and {decode}</div>
    );
}