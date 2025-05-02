'use client';
import {useState} from 'react';
import {addToast, Button, Card} from '@heroui/react';
import {ChevronLeftIcon, PlusIcon} from 'lucide-react';
import {NewModuleForm} from '@/app/(dashboard)/modules/components/NewModuleForm/NewModuleForm';
import {SubmoduleForm} from '@/app/(dashboard)/modules/components/SubModuleForm/SubmoduleForm';
import TableModules from '@/app/(dashboard)/modules/components/TableModules/TableModules';
import {Module, Submodule, ViewState} from '@/types/modules';
import NoModulesContent from "@/app/(dashboard)/modules/components/NoModulesContent/NoModulesContent";

const generateGuid = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

export default function ModulesPage() {
    const [viewState, setViewState] = useState<ViewState>('list');
    const [modules, setModules] = useState<Module[]>([]);
    const [submodules, setSubmodules] = useState<Submodule[]>([]);
    const [currentModule, setCurrentModule] = useState<Module | null>(null);

    const handleSaveModule = (moduleData: Omit<Module, 'id' | 'createdAt'>) => {
        const newModule: Module = {
            ...moduleData,
            id: generateGuid(),
            createdAt: new Date().toISOString(),
        };

        setModules([...modules, newModule]);
        setCurrentModule(newModule);
        addToast({
            title: `Módulo "${newModule.name}" creado exitosamente`,
            color: 'success'
        })
        setViewState('list');
    };

    const handleAddSubmodule = (submodule: Submodule) => {
        setSubmodules([...submodules, submodule]);
        if (currentModule) {
            addToast({
                title: `Submódulo "${submodule.name}" agregado al módulo "${currentModule.name}"`,
                color: 'success'
            })
        }
        setViewState('list');
    };

    const openSubmoduleView = (module: Module) => {
        setCurrentModule(module);
        setViewState('add-submodule');
    };

    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center py-4 px-1">
                <h1 className="text-2xl font-bold">Gestión de Módulos</h1>
                <div className="flex gap-3">
                    {viewState === 'list' && (
                        <Button
                            color="warning"
                            className="text-white"
                            onPress={() => setViewState('new-module')}
                            startContent={<PlusIcon size={18}/>}
                        >
                            Nuevo módulo
                        </Button>
                    )}
                    {viewState === 'new-module' && (
                        <Button
                            color="default"
                            variant="flat"
                            onPress={() => setViewState('list')}
                            startContent={<ChevronLeftIcon size={18}/>}
                        >
                            Volver a la lista
                        </Button>
                    )}
                </div>
            </div>

            {viewState === 'list' && (
                <>
                    {modules.length > 0 ? (
                        <TableModules
                            openSubmoduleView={openSubmoduleView}
                            modules={modules}
                            submodules={submodules}
                        />
                    ) : (
                        <NoModulesContent setViewState={setViewState}/>
                    )}
                </>
            )}

            {viewState === 'new-module' && (
                <Card className="p-6 shadow-md">
                    <h2 className="text-xl font-semibold mb-6 text-center">Crear nuevo módulo</h2>
                    <NewModuleForm onSaveModule={handleSaveModule}/>
                </Card>
            )}

            {viewState === 'add-submodule' && currentModule && (
                <SubmoduleForm
                    moduleId={currentModule.id}
                    moduleName={currentModule.name}
                    onSave={handleAddSubmodule}
                    onBack={() => setViewState('list')}
                />
            )}
        </div>
    );
}
