import { Button } from '@/components/ui/button';
import useEvent from './store';

const TagComponent = ({ tag }: { tag: string }) => {
  const store = useEvent();
  const addTagFilter = (tagName: string) => store.addTagFilter(tagName);
  return (
    <li>
      <Button variant="link" onClick={() => addTagFilter(tag)} className="text-slate-600 p-0.5">
        #{tag}
      </Button>
    </li>
  );
};
const TagList = ({ tags }: { tags: string[] }) => {
  if (!tags.length) return;
  return (
    <ul className="flex">
      {tags.map((tag: string) => (
        <TagComponent key={tag} tag={tag} />
      ))}
    </ul>
  );
};

export default TagList;
