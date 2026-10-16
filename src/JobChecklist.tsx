import { useState } from 'react';

// Standalone, public-safe adaptation of a checklist workflow from Curdux.
// Persistence is provided by the parent; this component has no database access.
export type ChecklistItem = {
  id: string;
  label: string;
  completed: boolean;
};

type Props = {
  initialItems: ChecklistItem[];
  canManage: boolean;
  saveItems: (items: ChecklistItem[]) => Promise<void>;
};

export function JobChecklist({ initialItems, canManage, saveItems }: Props) {
  const [items, setItems] = useState(initialItems);
  const [newLabel, setNewLabel] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const completed = items.filter(item => item.completed).length;
  const progress = items.length ? Math.round((completed / items.length) * 100) : 0;

  async function persist(nextItems: ChecklistItem[]) {
    setBusy(true);
    setError(null);
    try {
      await saveItems(nextItems);
      setItems(nextItems);
      return true;
    } catch {
      setError('Could not save changes. Please try again.');
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function toggle(id: string) {
    if (busy) return;
    const next = items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    await persist(next);
  }

  async function addItem(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canManage || busy) return;
    const label = newLabel.trim();
    if (!label) return;
    const next = [...items, { id: crypto.randomUUID(), label, completed: false }];
    if (await persist(next)) setNewLabel('');
  }

  return (
    <section aria-label="Job checklist">
      <p aria-live="polite">{completed} of {items.length} completed ({progress}%)</p>
      <progress value={completed} max={items.length || 1} aria-label="Checklist progress" />
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={item.completed}
                disabled={busy}
                onChange={() => void toggle(item.id)}
              />
              {item.label}
            </label>
          </li>
        ))}
      </ul>
      {canManage && (
        <form onSubmit={event => void addItem(event)}>
          <label htmlFor="new-checklist-label">New checklist item</label>
          <input
            id="new-checklist-label"
            value={newLabel}
            onChange={event => setNewLabel(event.target.value)}
            disabled={busy}
            maxLength={140}
          />
          <button type="submit" disabled={busy || !newLabel.trim()}>Add item</button>
        </form>
      )}
      {error && <p role="alert">{error}</p>}
    </section>
  );
}
