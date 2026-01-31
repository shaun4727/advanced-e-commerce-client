export type TreeItems = {
    id: string;
    _id?: string;
    data: { title: string; url: string; type: string };
    children?: TreeItems[];
};

/* ---------------------------------- */
/* Remove item from anywhere in tree */
/* ---------------------------------- */
export function removeItem(
    tree: TreeItems[],
    id: string,
): { tree: TreeItems[]; item: TreeItems | null } {
    let removed: TreeItems | null = null;

    const nextTree = tree.reduce<TreeItems[]>((acc, node) => {
        if (node.id === id) {
            removed = node;
            return acc;
        }

        if (node.children) {
            const res = removeItem(node.children, id);
            if (res.item) {
                removed = res.item;
                acc.push({ ...node, children: res.tree });
                return acc;
            }
        }

        acc.push(node);
        return acc;
    }, []);

    return { tree: nextTree, item: removed };
}

/* ----------------------------- */
/* Insert item at parent + index */
/* ----------------------------- */
export function insertItem(
    tree: TreeItems[],
    parentId: string | null,
    index: number,
    item: TreeItems,
): TreeItems[] {
    if (parentId === null) {
        const copy = [...tree];
        copy.splice(index, 0, item);
        return copy;
    }

    return tree.map((node) => {
        if (node.id === parentId) {
            const children = [...(node.children || [])];
            children.splice(index, 0, item);
            return { ...node, children };
        }

        return {
            ...node,
            children: node.children
                ? insertItem(node.children, parentId, index, item)
                : node.children,
        };
    });
}
export function insertItemCheck(
    tree: TreeItems[],
    parentId: string | null,
    index: number,
    item: TreeItems,
): TreeItems[] {
    // Handling Root Level Insertion
    if (parentId === null) {
        const copy = [...tree];
        copy.splice(index, 0, item);
        return copy;
    }

    return tree.map((node) => {
        if (node.id === parentId) {
            // Ensure children is ALWAYS an array before splicing
            const children = Array.isArray(node.children)
                ? [...node.children]
                : [];
            children.splice(index, 0, item);
            return { ...node, children };
        }

        if (node.children && node.children.length > 0) {
            return {
                ...node,
                children: insertItemCheck(node.children, parentId, index, item),
            };
        }

        return node;
    });
}

/* ----------------------------- */
/* Find parent of an item */
/* ----------------------------- */
export function findParentId(
    tree: TreeItems[],
    id: string,
    parent: string | null = null,
): string | null {
    for (const node of tree) {
        if (node.id === id) return parent;
        if (node.children) {
            const found = findParentId(node.children, id, node.id);
            if (found !== null) return found;
        }
    }
    return null;
}

/* ----------------------------- */
/* Find index of item in siblings */
/* ----------------------------- */
export function findIndex(tree: TreeItems[], id: string): number {
    for (const node of tree) {
        if (node.children) {
            const index = node.children.findIndex((c) => c.id === id);
            if (index !== -1) return index;
            const deep = findIndex(node.children, id);
            if (deep !== -1) return deep;
        }
    }
    return -1;
}

/* ----------------------------- */
/* Get child count of parent */
/* ----------------------------- */
export function getChildCount(tree: TreeItems[], parentId: string): number {
    for (const node of tree) {
        if (node.id === parentId) {
            return node.children?.length ?? 0;
        }
        if (node.children) {
            const count = getChildCount(node.children, parentId);
            if (count !== -1) return count;
        }
    }
    return 0;
}
