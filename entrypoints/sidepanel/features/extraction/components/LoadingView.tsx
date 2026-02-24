import { Spinner } from '../../../components/Spinner'

export const LoadingView = () => (
  <div className="flex-1 flex items-center justify-center py-16 animate-fade-in-up">
    <Spinner className="w-6 h-6" />
  </div>
)
