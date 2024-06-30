/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilExpandArrows from '@iconscout/react-unicons/icons/uil-expand-arrows';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import { CSS } from '@dnd-kit/utilities';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy, useSortable } from '@dnd-kit/sortable';
import Heading from '../../components/heading/heading';
import { Button } from '../../components/buttons/buttons';
import { TableWrapper, DragDropStyle } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';

function DragAndDropTable() {
  const { users } = useSelector((state) => {
    return {
      users: state.users,
    };
  });

  const usersTableData = [];
  users.map((user, index) => {
    const { name, designation, img } = user;

    return usersTableData.push({
      key: index + 1,
      index,
      user: (
        <div className="user-info">
          <figure>
            <img style={{ width: '40px' }} src={require(`../../${img}`)} alt="" />
          </figure>
          <figcaption>
            <Heading className="user-name" as="h6">
              {name}
            </Heading>
          </figcaption>
        </div>
      ),
      email: <span className="drag_email">john@gmail.com</span>,
      company: <span className="drag_company">Business Development</span>,
      position: <span className="drag_designation">{designation}</span>,
      joinDate: <span className="drag_join-date">January 20, 2020</span>,
      action: (
        <div className="table-actions">
          <Button className="btn-icon" type="info" to="#" shape="circle">
            <UilEdit />
          </Button>
          <Button className="btn-icon" type="danger" to="#" shape="circle">
            <UilTrashAlt />
          </Button>
        </div>
      ),
    });
  });

  const [state, setState] = useState({
    dataSource: usersTableData,
  });

  const { dataSource } = state;

  function SortableItem(value) {
    const item = value.value;
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item });
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <tr className="ant-table-row" ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <td className="ant-table-cell drag-visible" aria-label="Drag">
          <UilExpandArrows />
        </td>
        <td className="ant-table-cell">{item.user}</td>
        <td className="ant-table-cell">{item.email}</td>
        <td className="ant-table-cell">{item.company}</td>
        <td className="ant-table-cell">{item.position}</td>
        <td className="ant-table-cell">{item.joinDate}</td>
        <td className="ant-table-cell">{item.action}</td>
      </tr>
    );
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      const activeIndex = dataSource.findIndex((item) => item.key === active.id.key);
      const overIndex = dataSource.findIndex((item) => item.key === over.id.key);
      const newData = arrayMove(dataSource, activeIndex, overIndex);

      setState({ ...state, dataSource: newData });
    }
  }

  return (
    <div>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <DragDropStyle>
          <Cards title="Drag & Drop">
            <TableWrapper className="table-responsive">
              <div className="ant-table-wrapper">
                <div className="ant-table">
                  <div className="ant-table-container">
                    <div className="ant-table-content">
                      <table>
                        <tbody className="ant-table-tbody">
                          <SortableContext items={dataSource} strategy={rectSortingStrategy}>
                            {dataSource.map((value, index) => (
                              <SortableItem key={index} index={index} value={value} />
                            ))}
                          </SortableContext>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </TableWrapper>
          </Cards>
        </DragDropStyle>
      </DndContext>
    </div>
  );
}

export default DragAndDropTable;
