import { JobChecklist, type ChecklistItem } from './JobChecklist';

const demoItems: ChecklistItem[] = [
  { id: 'demo-a', label: 'Check device connectivity', completed: true },
  { id: 'demo-b', label: 'Verify user access', completed: false },
  { id: 'demo-c', label: 'Record deployment outcome', completed: false },
];

export default function App() {
  // The demo intentionally stores nothing remotely or persistently.
  return (
    <main>
      <h1>Operational Job Checklist — Curdux Code Sample</h1>
      <p>Standalone demo using illustrative task labels; no live application data.</p>
      <JobChecklist
        initialItems={demoItems}
        canManage
        saveItems={async () => { /* Demo accepts changes in this session only. */ }}
      />
    </main>
  );
}
