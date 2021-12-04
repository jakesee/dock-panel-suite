import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { CDockForm, DockLayoutDirection, IDockManager } from './hooks';
import DockLayout from './DockLayout';

export const Wrapper = styled.div`
  --backgroundColor: #35496a;
  --systemColor: #e8e8ec;

  background-color: var(--backgroundColor);

  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const DockManager = ({
  manager,
  onStacking,
  onSplitting,
  onRenderForm,
}: {
  manager: IDockManager;
  onStacking?: (sourceId: string, destinationId: string) => boolean;
  onSplitting?: (sourceId: string, destinationId: string, direction: DockLayoutDirection) => boolean;
  onRenderForm: (form: CDockForm) => ReactNode;
}) => {
  const handleStacking = (formId: string, panelId: string): boolean => {
    if (!(onStacking && onStacking(formId, panelId))) {
      manager.stack(formId, panelId);
    }

    return true;
  };

  const handleSplitting = (formId: string, panelId: string, direction: DockLayoutDirection) => {
    if (!(onSplitting && onSplitting(formId, panelId, direction))) {
      manager.split(formId, panelId, direction);
    }

    return true;
  };

  return (
    <Wrapper className="dock-manager">
      <DockLayout layout={manager.layout} onStacking={handleStacking} onSplitting={handleSplitting} onRenderForm={onRenderForm} />
    </Wrapper>
  );
};
