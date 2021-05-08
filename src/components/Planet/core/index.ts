import render from "./core"

export default (root: HTMLElement) => {
    const width = root.clientWidth;
    const height = root.clientHeight;
    
    return render(width, height, root);
}