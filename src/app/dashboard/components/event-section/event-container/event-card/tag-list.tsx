import { Button } from '@/components/ui/button';
import useEvent from '@/app/dashboard/store';

const TagComponent = ({ tag }: { tag: string }) => {
  return (
    <li>
      <Button variant="link" className="text-slate-600 p-0.5">
        #{tag}
      </Button>
    </li>
  );
};
const TagList = ({ eventTags }: { eventTags: string[] }) => {
  const store = useEvent();
  if (!eventTags.length) return;
  const handleClick = (el: HTMLLIElement) => {
    const tag = el.innerText.startsWith('#') && el.innerText.slice(1);
    if (!tag) return;
    const tagList = [...store.tagFilter]
    const tagIdx = tagList.indexOf(tag);
    if (tagIdx >= 0) {
      tagList.splice(tagIdx, 1);
    } else {
      tagList.push(tag);
    }
    store.setTagFilter(tagList);

  };
  return (
    <ul className="flex" onClick={(evt) => handleClick(evt.target as HTMLLIElement)}>
      {eventTags.map((tag: string) => (
        <TagComponent key={tag} tag={tag} />
      ))}
    </ul>
  );
};

export default TagList;
