export function getAbsoluteHeight(node) {
    const styles = window.getComputedStyle(node);
    const margin = parseInt(styles['marginTop']) + parseInt(styles['marginBottom']);
    return node.offsetHeight + margin;
}
