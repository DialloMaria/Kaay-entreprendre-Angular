import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageForumListComponent } from './message-forum-list.component';

describe('MessageForumListComponent', () => {
  let component: MessageForumListComponent;
  let fixture: ComponentFixture<MessageForumListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageForumListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageForumListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
