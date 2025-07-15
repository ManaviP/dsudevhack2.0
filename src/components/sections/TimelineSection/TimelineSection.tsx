import { Timeline } from '../../Timeline';

const timelineData = [
  {
    title: 'Registration starts',
    content: (
      <div>
        <div className="font-semibold text-base mb-1">The Race Begins — Register. Team Up. Get Set to Hack!</div>
        <div className="text-sm text-blue-500">1st July 2025</div>
      </div>
    ),
  },
  {
    title: 'Idea submissions start',
    content: (
      <div>
        <div className="font-semibold text-base mb-1">Time to Spark Ideas — Let the Innovation Flow!</div>
        <div className="text-sm text-blue-500">25th July 2025</div>
      </div>
    ),
  },
  {
    title: 'Registration Deadline',
    content: (
      <div>
        <div className="font-semibold text-base mb-1">Last Call to Enter the Arena!</div>
        <div className="text-sm text-blue-500">18th August 2025</div>
      </div>
    ),
  },
  {
    title: 'Idea Submission Deadline',
    content: (
      <div>
        <div className="font-semibold text-base mb-1">Ideas Lock In — Let the Best Concepts Win!</div>
        <div className="text-sm text-blue-500">20th August 2025</div>
      </div>
    ),
  },
  {
    title: 'Shortlisted Teams Announcement',
    content: (
      <div>
        <div className="font-semibold text-base mb-1">And the Chosen Ones Are... Meet the Finalists!</div>
        <div className="text-sm text-blue-500">1st September 2025</div>
      </div>
    ),
  },
  {
    title: 'Hacking Period Starts',
    content: (
      <div>
        <div className="font-semibold text-base mb-1">The Code War Begins — Hack Like There’s No Tomorrow!</div>
        <div className="text-sm text-blue-500">12th September</div>
      </div>
    ),
  },
  {
    title: 'Final Submission',
    content: (
      <div>
        <div className="font-semibold text-base mb-1">One Last Push — Deliver Your Innovation!</div>
        <div className="text-sm text-blue-500">13th September 2025</div>
      </div>
    ),
  },
  {
    title: 'Final Evaluation Result',
    content: (
      <div>
        <div className="font-semibold text-base mb-1">The Verdict is In — Witness the Best Rise!</div>
        <div className="text-sm text-blue-500">13th September 2025</div>
      </div>
    ),
  },
];

export const TimelineSection = () => {
  return (
    <section id="timeline" className="timeline-section-bg">
      <Timeline data={timelineData} />
    </section>
  );
};
