import { TestBed } from '@angular/core/testing';

import { TournamentconfigurationService } from './tournamentconfiguration.service';

describe('TournamentconfigurationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TournamentconfigurationService = TestBed.get(TournamentconfigurationService);
    expect(service).toBeTruthy();
  });
});
