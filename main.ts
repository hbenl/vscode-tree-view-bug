import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const provider = new BugDemoTreeDataProvider();
    context.subscriptions.push(vscode.window.registerTreeDataProvider('bugdemo', provider));
    context.subscriptions.push(vscode.commands.registerCommand('bugdemo.increase', () => provider.increase()));
}

export class BugDemoTreeDataProvider implements vscode.TreeDataProvider<BugDemoTreeItem> {

    readonly treeDataChanged = new vscode.EventEmitter<BugDemoTreeItem>();
    readonly onDidChangeTreeData: vscode.Event<BugDemoTreeItem>;

    private counter = 0;

    constructor() {
        this.onDidChangeTreeData = this.treeDataChanged.event;
    }

    getTreeItem(element: BugDemoTreeItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: BugDemoTreeItem): vscode.ProviderResult<BugDemoTreeItem[]> {
        if (element) {
            return element.children;
        } else {
            return [rootItem];
        }
    }

    increase() {
        this.counter++;
        rootItem.label = `Root: ${this.counter}`;
        childItem.label = `Child: ${this.counter}`;
        grandchildItem.label = `Grandchild: ${this.counter}`;
        this.treeDataChanged.fire();
    }
}

interface BugDemoTreeItem extends vscode.TreeItem {
    children: BugDemoTreeItem[];
}

const grandchildItem : BugDemoTreeItem = {
    id: 'grandchild',
    label: 'Grandchild: 0',
    collapsibleState: vscode.TreeItemCollapsibleState.None,
    children: []
};

const childItem: BugDemoTreeItem = {
    id: 'child',
    label: 'Child: 0',
    collapsibleState: vscode.TreeItemCollapsibleState.Collapsed,
    children: [grandchildItem]
};

const rootItem: BugDemoTreeItem = {
    id: 'root',
    label: 'Root: 0',
    collapsibleState: vscode.TreeItemCollapsibleState.Collapsed,
    children: [childItem]
};

