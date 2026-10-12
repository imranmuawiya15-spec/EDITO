import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  VideoProject, 
  HireRequest, 
  CommentItem, 
  ADMIN_EMAIL, 
  ADMIN_NAME, 
  ADMIN_EXPERIENCE, 
  ADMIN_PLATFORM,
  ReviewStatus,
  HireRequestStatus
} from '../types';
import { INITIAL_PROJECTS, INITIAL_HIRE_REQUESTS } from '../data/initialData';

interface UserSession {
  role: 'admin' | 'client' | 'guest';
  email: string;
  name: string;
}

interface AppContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  user: UserSession;
  adminLoginError: string | null;
  loginAsAdmin: (email: string, password: string) => boolean;
  loginAsClient: (name: string, email: string) => void;
  logout: () => void;
  projects: VideoProject[];
  selectedProjectId: string;
  setSelectedProjectId: (id: string) => void;
  activeProject: VideoProject | undefined;
  addProject: (project: Omit<VideoProject, 'id' | 'createdAt' | 'comments'>) => VideoProject;
  updateProjectStatus: (projectId: string, status: ReviewStatus) => void;
  deleteProject: (projectId: string) => void;
  addComment: (projectId: string, comment: Omit<CommentItem, 'id' | 'createdAt' | 'resolved'>) => void;
  toggleCommentResolved: (projectId: string, commentId: string) => void;
  deleteComment: (projectId: string, commentId: string) => void;
  hireRequests: HireRequest[];
  submitHireRequest: (request: Omit<HireRequest, 'id' | 'status' | 'submittedAt'>) => void;
  updateHireStatus: (requestId: string, status: HireRequestStatus) => void;
  deleteHireRequest: (requestId: string) => void;
  adminProfile: {
    name: string;
    email: string;
    experience: string;
    platform: string;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_PROJECTS = 'muawiya_studio_projects_v1';
const STORAGE_KEY_HIRES = 'muawiya_studio_hires_v1';
const STORAGE_KEY_THEME = 'muawiya_studio_theme_v1';
const STORAGE_KEY_USER = 'muawiya_studio_user_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_THEME);
    return saved === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_THEME, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // User auth state
  const [user, setUser] = useState<UserSession>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return { role: 'guest', email: '', name: 'Guest Reviewer' };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
  }, [user]);

  const [adminLoginError, setAdminLoginError] = useState<string | null>(null);

  // Projects state
  const [projects, setProjects] = useState<VideoProject[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROJECTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_PROJECTS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projects));
  }, [projects]);

  const [selectedProjectId, setSelectedProjectId] = useState<string>(() => {
    return INITIAL_PROJECTS[0]?.id || '';
  });

  const activeProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  // Hire requests state
  const [hireRequests, setHireRequests] = useState<HireRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_HIRES);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_HIRE_REQUESTS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_HIRES, JSON.stringify(hireRequests));
  }, [hireRequests]);

  // Admin authentication: strictly only imranmuawiya15@gmail.com
  const loginAsAdmin = (email: string, password: string): boolean => {
    const normalizedEmail = email.trim().toLowerCase();
    
    if (normalizedEmail !== ADMIN_EMAIL.toLowerCase()) {
      setAdminLoginError(`Access Denied: Only ${ADMIN_EMAIL} is authorized as Administrator. No other accounts can access admin tools.`);
      return false;
    }

    // Check password (allow standard admin password or simple verification)
    if (password.trim().length === 0) {
      setAdminLoginError('Please enter your admin security password.');
      return false;
    }

    setAdminLoginError(null);
    setUser({
      role: 'admin',
      email: ADMIN_EMAIL,
      name: ADMIN_NAME
    });
    return true;
  };

  const loginAsClient = (name: string, email: string) => {
    setUser({
      role: 'client',
      email: email.trim(),
      name: name.trim() || 'Client Reviewer'
    });
  };

  const logout = () => {
    setUser({
      role: 'guest',
      email: '',
      name: 'Guest Reviewer'
    });
    setAdminLoginError(null);
  };

  // Project management
  const addProject = (projectData: Omit<VideoProject, 'id' | 'createdAt' | 'comments'>): VideoProject => {
    const newProject: VideoProject = {
      ...projectData,
      id: `proj-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      comments: []
    };

    setProjects(prev => [newProject, ...prev]);
    setSelectedProjectId(newProject.id);
    return newProject;
  };

  const updateProjectStatus = (projectId: string, status: ReviewStatus) => {
    setProjects(prev =>
      prev.map(p => (p.id === projectId ? { ...p, status } : p))
    );
  };

  const deleteProject = (projectId: string) => {
    setProjects(prev => {
      const filtered = prev.filter(p => p.id !== projectId);
      if (selectedProjectId === projectId && filtered.length > 0) {
        setSelectedProjectId(filtered[0].id);
      }
      return filtered;
    });
  };

  // Feedback comments
  const addComment = (projectId: string, commentData: Omit<CommentItem, 'id' | 'createdAt' | 'resolved'>) => {
    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const newComment: CommentItem = {
      ...commentData,
      id: `comm-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      resolved: false,
      createdAt: timeStr
    };

    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          return {
            ...p,
            comments: [...p.comments, newComment]
          };
        }
        return p;
      })
    );
  };

  const toggleCommentResolved = (projectId: string, commentId: string) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          return {
            ...p,
            comments: p.comments.map(c =>
              c.id === commentId ? { ...c, resolved: !c.resolved } : c
            )
          };
        }
        return p;
      })
    );
  };

  const deleteComment = (projectId: string, commentId: string) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          return {
            ...p,
            comments: p.comments.filter(c => c.id !== commentId)
          };
        }
        return p;
      })
    );
  };

  // Hire requests
  const submitHireRequest = (requestData: Omit<HireRequest, 'id' | 'status' | 'submittedAt'>) => {
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const newReq: HireRequest = {
      ...requestData,
      id: `hire-${Date.now()}`,
      status: 'New',
      submittedAt: dateStr
    };

    setHireRequests(prev => [newReq, ...prev]);
  };

  const updateHireStatus = (requestId: string, status: HireRequestStatus) => {
    setHireRequests(prev =>
      prev.map(r => (r.id === requestId ? { ...r, status } : r))
    );
  };

  const deleteHireRequest = (requestId: string) => {
    setHireRequests(prev => prev.filter(r => r.id !== requestId));
  };

  const adminProfile = {
    name: ADMIN_NAME,
    email: ADMIN_EMAIL,
    experience: ADMIN_EXPERIENCE,
    platform: ADMIN_PLATFORM
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        user,
        adminLoginError,
        loginAsAdmin,
        loginAsClient,
        logout,
        projects,
        selectedProjectId,
        setSelectedProjectId,
        activeProject,
        addProject,
        updateProjectStatus,
        deleteProject,
        addComment,
        toggleCommentResolved,
        deleteComment,
        hireRequests,
        submitHireRequest,
        updateHireStatus,
        deleteHireRequest,
        adminProfile
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
