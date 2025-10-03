import { Button } from '@/components/ui/button';

const TagComponent = ({ tag }: { tag: string }) => (
  <li>
    <Button variant='link' className="text-slate-600 p-0.5">#{tag}
    </Button>
  </li>
);
const TagList = ({
  tags,
}: {
  tags: string[];
}) => {
  if (!tags.length) return;
  return (
    <ul className="flex">
        {tags.map((tag: string) => <TagComponent key={tag} tag={tag} />)}
    </ul>
  );
};

export default TagList;
