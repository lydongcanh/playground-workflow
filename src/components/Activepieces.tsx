import { IconChevronDown } from "@tabler/icons-react";
import { Checkbox, Group, RenderTreeNodePayload, Tree } from "@mantine/core";
import { data } from "./data";

const renderTreeNode = ({ node, expanded, hasChildren, elementProps, tree }: RenderTreeNodePayload) => {
  const checked = tree.isNodeChecked(node.value);
  const indeterminate = tree.isNodeIndeterminate(node.value);

  return (
    <Group gap="xs" {...elementProps}>
      <Checkbox.Indicator
        checked={checked}
        indeterminate={indeterminate}
        onClick={() => (!checked ? tree.checkNode(node.value) : tree.uncheckNode(node.value))}
      />

      <Group gap={5} onClick={() => tree.toggleExpanded(node.value)}>
        <span>{node.label}</span>

        {hasChildren && <IconChevronDown size={14} style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }} />}
      </Group>
    </Group>
  );
};

function Activepieces() {
  return <Tree data={data} levelOffset={23} expandOnClick={false} renderNode={renderTreeNode} />;
}

export default Activepieces;
