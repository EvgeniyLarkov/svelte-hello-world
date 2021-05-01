import render from "./core"

export default (root: HTMLElement): (x: boolean) => void => {
    const width = root.clientWidth;
    const height = root.clientHeight;
    
    return render(width, height, root);
}