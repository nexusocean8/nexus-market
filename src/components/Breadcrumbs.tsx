import { NavLink } from 'react-router-dom';

interface BreadcrumbsProps {
  title: string;
  section1: string;
  path1: string;
  section2?: string;
  path2?: string;
  page: string;
}

export const Breadcrumbs = ({
  title,
  section1,
  path1,
  section2,
  path2,
  page,
}: BreadcrumbsProps) => {
  return (
    <div className="bg-gradient-hero py-16 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-white text-center">
          {title}
        </h1>
        <nav className="flex items-center gap-3">
          <NavLink
            to={path1}
            className="text-lavender-300 hover:text-white transition-colors hover:underline"
          >
            {section1}
          </NavLink>
          <span className="text-lavender-400">/</span>
          {section2 && path2 && (
            <>
              <NavLink
                to={path2}
                className="text-lavender-300 hover:text-white transition-colors hover:underline"
              >
                {section2}
              </NavLink>
              <span className="text-lavender-400">/</span>
            </>
          )}
          <span className="text-white font-medium">{page}</span>
        </nav>
      </div>
    </div>
  );
};
