import { DebugPanel } from './components/DebugPanel'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { ModuleTabs } from './components/ModuleTabs'
import { ErrorView } from './features/extraction/components/ErrorView'
import { ExtractingView } from './features/extraction/components/ExtractingView'
import { LoadingView } from './features/extraction/components/LoadingView'
import { NoticeView } from './features/extraction/components/NoticeView'
import { useExtraction } from './features/extraction/hooks/useExtraction'
import { useTipRotation } from './features/extraction/hooks/useTipRotation'
import { ReadyView } from './features/filters/components/ReadyView'
import { ResultsView } from './features/results/components/ResultsView'
import { useSettings } from './hooks/useSettings'

export default function App() {
  const { settings, updateSetting, handleCustomDateStart, handleCustomDateEnd } = useSettings()
  const { state, handleExtract, handleStop, handleNewExtraction, navigateToActivity } =
    useExtraction(settings)
  const { tipIndex, tipKeys } = useTipRotation(state.view === 'extracting')

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-40 bg-bg">
        <Header />
        {state.view !== 'loading' && <ModuleTabs />}
      </div>

      {state.view === 'loading' && <LoadingView />}
      {state.view === 'not-linkedin' && <NoticeView variant="not-linkedin" />}
      {state.view === 'wrong-page' && (
        <NoticeView variant="wrong-page" onNavigate={navigateToActivity} />
      )}
      {state.view === 'ready' && (
        <ReadyView
          context={state.context}
          settings={settings}
          onUpdateSetting={updateSetting}
          onCustomDateStart={handleCustomDateStart}
          onCustomDateEnd={handleCustomDateEnd}
          onExtract={handleExtract}
        />
      )}
      {state.view === 'extracting' && (
        <ExtractingView
          progress={state.progress}
          tipIndex={tipIndex}
          tipKeys={tipKeys}
          onStop={handleStop}
        />
      )}
      {state.view === 'results' && (
        <ResultsView
          posts={state.posts}
          context={state.context}
          settings={settings}
          onNewExtraction={handleNewExtraction}
        />
      )}
      {state.view === 'error' && (
        <ErrorView message={state.message} onRetry={handleNewExtraction} />
      )}

      <Footer />
      <DebugPanel />
    </div>
  )
}
