import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type ProjectCategory = 'frontend' | 'fullstack' | 'backend' | 'mobile';

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  category: ProjectCategory;
  link?: string;
  github?: string;
}

interface ProjectState {
  items: Project[];
  loading: boolean;
  error: string | null;
  filter: ProjectCategory | 'all';
}

const initialState: ProjectState = {
  items: [],
  loading: false,
  error: null,
  filter: 'all',
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.items = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setFilter: (state, action: PayloadAction<ProjectCategory | 'all'>) => {
      state.filter = action.payload;
    },
  },
});

export const { setProjects, setLoading, setError, setFilter } =
  projectSlice.actions;
export default projectSlice.reducer;
